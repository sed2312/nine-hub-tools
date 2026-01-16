import { Layout } from '@/components/layout/Layout';

export default function PrivacyPolicy() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <article className="prose prose-invert mx-auto">
                    <h1>Privacy Policy</h1>

                    <p className="text-muted-foreground">
                        Last updated: January 2026
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        NineProo does not require user accounts and does not intentionally collect personal data.
                    </p>
                    <p>We may collect:</p>
                    <ul>
                        <li>Anonymous usage data (page views, tool usage)</li>
                        <li>Technical information (browser type, device, OS)</li>
                    </ul>

                    <h2>2. Cookies</h2>
                    <p>
                        NineProo may use essential cookies or analytics cookies to understand how the Website is used.
                        No cookies are used for advertising or individual tracking.
                    </p>

                    <h2>3. Third-Party Services</h2>
                    <p>
                        We may use third-party analytics services that collect anonymized data according to their own privacy policies.
                    </p>

                    <h2>4. Data Security</h2>
                    <p>
                        We take reasonable steps to protect the Website, but no online system is completely secure.
                    </p>

                    <h2>5. External Links</h2>
                    <p>
                        NineProo may contain links to external websites (including social platforms). We are not responsible for the privacy practices of third-party sites.
                    </p>

                    <h2>6. Children's Information</h2>
                    <p>
                        NineProo does not knowingly collect personal information from children under the age of 13.
                    </p>

                    <h2>7. Changes to This Policy</h2>
                    <p>
                        This Privacy Policy may be updated from time to time. Updates will be posted on this page.
                    </p>

                    <h2>8. Contact</h2>
                    <p>
                        For privacy-related inquiries, contact:<br />
                        Email: <a href="mailto:hello@nineproo.com">hello@nineproo.com</a>
                    </p>
                </article>
            </div>
        </Layout>
    );
}
