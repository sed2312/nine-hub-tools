import { Layout } from '@/components/layout/Layout';

export default function CookiePolicy() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <article className="prose prose-invert mx-auto">
                    <h1>Cookie Policy</h1>

                    <p className="text-muted-foreground">
                        Last updated: January 2026
                    </p>

                    <h2>1. What Are Cookies?</h2>
                    <p>
                        Cookies are small text files stored on your device to improve website functionality.
                    </p>

                    <h2>2. How We Use Cookies</h2>
                    <p>NineProo uses cookies only to:</p>
                    <ul>
                        <li>Measure anonymous traffic</li>
                        <li>Improve performance and user experience</li>
                    </ul>

                    <h2>3. Managing Cookies</h2>
                    <p>
                        You can disable cookies via your browser settings. Some features may not function correctly if cookies are disabled.
                    </p>

                    <h2>4. Third-Party Cookies</h2>
                    <p>
                        Third-party analytics tools may place cookies under their own policies.
                    </p>

                    <h2>Contact</h2>
                    <p>
                        For questions about cookies, contact:<br />
                        Email: <a href="mailto:hello@nineproo.com">hello@nineproo.com</a>
                    </p>
                </article>
            </div>
        </Layout>
    );
}
