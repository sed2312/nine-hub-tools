import { Layout } from '@/components/layout/Layout';

export default function Disclaimer() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <article className="prose prose-invert mx-auto">
                    <h1>Disclaimer</h1>

                    <p className="text-muted-foreground">
                        Last updated: January 2026
                    </p>

                    <p>
                        The tools and content provided on NineProo are for informational and educational purposes only.
                    </p>

                    <ul>
                        <li>NineProo makes no guarantees regarding accuracy or reliability</li>
                        <li>Outputs should be reviewed before professional or production use</li>
                        <li>NineProo is not responsible for losses resulting from tool usage</li>
                        <li>Use the Website at your own risk</li>
                    </ul>

                    <h2>Contact</h2>
                    <p>
                        For questions, contact us at:<br />
                        Email: <a href="mailto:hello@nineproo.com">hello@nineproo.com</a>
                    </p>
                </article>
            </div>
        </Layout>
    );
}
