import { Layout } from '@/components/layout/Layout';

export default function TermsOfService() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <article className="prose prose-invert mx-auto">
                    <h1>Terms of Service</h1>

                    <p className="text-muted-foreground">
                        Last updated: January 2026
                    </p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using NineProo ("the Website"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Website.
                    </p>

                    <h2>2. Description of Service</h2>
                    <p>
                        NineProo provides free online web tools for developers, designers, and creators. All tools are provided as-is and free of charge.
                    </p>

                    <h2>3. Use of the Website</h2>
                    <p>You agree to use NineProo only for lawful purposes and in a way that does not:</p>
                    <ul>
                        <li>Violate any applicable laws</li>
                        <li>Infringe intellectual property rights</li>
                        <li>Attempt to disrupt or overload the Website</li>
                    </ul>

                    <h2>4. Intellectual Property</h2>
                    <p>
                        All content, design, branding, and source code on NineProo are the property of NineProo unless otherwise stated.
                        You may not copy, redistribute, or resell the Website or its tools without permission.
                    </p>

                    <h2>5. No Warranty</h2>
                    <p>
                        NineProo is provided "as is" and "as available".
                        We make no guarantees regarding accuracy, reliability, availability, or suitability for any purpose.
                    </p>

                    <h2>6. Limitation of Liability</h2>
                    <p>
                        NineProo shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the Website.
                    </p>

                    <h2>7. Changes to Terms</h2>
                    <p>
                        We reserve the right to update these Terms at any time. Continued use of the Website constitutes acceptance of the revised Terms.
                    </p>

                    <h2>8. Contact</h2>
                    <p>
                        For any questions regarding these Terms, contact us at:<br />
                        Email: <a href="mailto:hello@nineproo.com">hello@nineproo.com</a>
                    </p>
                </article>
            </div>
        </Layout>
    );
}
