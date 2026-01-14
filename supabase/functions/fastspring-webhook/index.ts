import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WebhookEvent {
  id: string
  type: string
  live: boolean
  data: {
    id: string
    subscription: string
    account: string
    product: string
    email?: string
    customer?: {
      email: string
    }
    next?: string
    end?: string
    state?: string
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const webhookSecret = Deno.env.get('FASTSPRING_WEBHOOK_SECRET')
    
    // Verify webhook signature if secret is set
    if (webhookSecret) {
      const signature = req.headers.get('x-fs-signature')
      if (!signature) {
        return new Response(JSON.stringify({ error: 'Missing signature' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      // Note: In production, verify HMAC-SHA256 signature here
    }

    const body = await req.json()
    const events: WebhookEvent[] = body.events || [body]

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    for (const event of events) {
      const { type, data } = event
      const email = data.email || data.customer?.email

      if (!email) {
        console.log('No email found in event:', type)
        continue
      }

      console.log('Processing event:', type, 'for email:', email)

      switch (type) {
        case 'subscription.activated':
        case 'subscription.updated': {
          const planType = data.product?.includes('annual') ? 'annual' : 'monthly'
          
          const { error } = await supabase
            .from('subscriptions')
            .upsert({
              email: email.toLowerCase().trim(),
              fastspring_subscription_id: data.subscription,
              fastspring_account_id: data.account,
              plan_type: planType,
              status: 'active',
              current_period_start: new Date().toISOString(),
              current_period_end: data.next || data.end,
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'fastspring_subscription_id',
            })

          if (error) {
            console.error('Error upserting subscription:', error)
          }
          break
        }

        case 'subscription.deactivated':
        case 'subscription.canceled': {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'canceled',
              updated_at: new Date().toISOString(),
            })
            .eq('fastspring_subscription_id', data.subscription)

          if (error) {
            console.error('Error updating subscription:', error)
          }
          break
        }

        case 'subscription.charge.completed': {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              current_period_end: data.next,
              updated_at: new Date().toISOString(),
            })
            .eq('fastspring_subscription_id', data.subscription)

          if (error) {
            console.error('Error updating subscription:', error)
          }
          break
        }

        case 'subscription.charge.failed': {
          console.log('Charge failed for subscription:', data.subscription)
          // Could send notification or update status
          break
        }

        default:
          console.log('Unhandled event type:', type)
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
