import { Layout } from '@/components/layout/Layout';
import { Mail } from 'lucide-react';

export default function Contact() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-2xl">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Email</h2>
                            <a href="mailto:hello@nineproo.com" className="text-primary hover:underline">
                                hello@nineproo.com
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Social Media</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://x.com/nine_proo" className="text-primary hover:underline">
                                    Twitter/X: @nine_proo
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/nine_proo" className="text-primary hover:underline">
                                    Instagram: @nine_proo
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
