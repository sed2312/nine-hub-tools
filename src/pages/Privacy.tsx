import { Layout } from '@/components/layout/Layout';

export default function Privacy() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <article className="prose prose-invert mx-auto">
                    <h1>Privacy Policy</h1>

                    <p className="text-muted-foreground">
                        Last Updated: January 16, 2026
                    </p>

                    <h2>Introduction</h2>
                    <p>
                        Welcome to Nine Hub Tools ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website at nineproo.com.
                    </p>

                    <h2>Information We Collect</h2>

                    <h3>1. Information You Provide</h3>
                    <ul>
                        <li><strong>Email Address:</strong> When you sign up for our newsletter or create an account, we collect your email address.</li>
                        <li><strong>Tool Preferences:</strong> We may save your tool settings and preferences locally in your browser.</li>
                    </ul>

                    <h3>2. Automatically Collected Information</h3>
                    <ul>
                        <li><strong>Analytics Data:</strong> We use Google Analytics to understand how visitors use our site. This includes:
                            <ul>
                                <li>Pages visited</li>
                                <li>Time spent on site</li>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>Geographic location (country/city level)</li>
                            </ul>
                        </li>
                        <li><strong>Cookies:</strong> We use essential cookies for site functionality and analytics cookies to improve our service.</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>We use the collected information to:</p>
                    <ul>
                        <li>Provide and maintain our services</li>
                        <li>Send you updates about new tools and features (if you opted in)</li>
                        <li>Improve our website and user experience</li>
                        <li>Analyze usage patterns to enhance our tools</li>
                        <li>Respond to your inquiries and support requests</li>
                    </ul>

                    <h2>Data Sharing and Third Parties</h2>
                    <p>We do not sell your personal data. We share data only with:</p>
                    <ul>
                        <li><strong>Service Providers:</strong>
                            <ul>
                                <li>Google Analytics (analytics)</li>
                                <li>Loops.so (email marketing)</li>
                                <li>Supabase (authentication and database)</li>
                            </ul>
                        </li>
                        <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights.</li>
                    </ul>

                    <h2>Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access the personal data we hold about you</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Disable cookies in your browser settings</li>
                    </ul>

                    <h2>Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.
                    </p>

                    <h2>Children's Privacy</h2>
                    <p>
                        Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal data, please contact us.
                    </p>

                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at:
                    </p>
                    <ul>
                        <li>Email: <a href="mailto:hello@nineproo.com">hello@nineproo.com</a></li>
                        <li>Website: <a href="https://nineproo.com/contact">nineproo.com/contact</a></li>
                    </ul>
                </article>
            </div>
        </Layout>
    );
}
