import { Layout } from '@/components/layout/Layout';

export default function About() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <article className="prose prose-invert mx-auto">
                    <h1>About Nine Hub Tools</h1>

                    <p>
                        Nine Hub Tools is a free, open-source platform that provides professional-grade
                        design tools for web developers and designers.
                    </p>

                    <h2>Our Mission</h2>
                    <p>
                        To make professional design tools accessible to everyone, without paywalls,
                        subscriptions, or limitations. We believe great tools should be free.
                    </p>

                    <h2>The Tools</h2>
                    <p>
                        All 9 tools are completely free and will remain free forever. Each tool is
                        crafted to solve specific design challenges that developers face daily.
                    </p>

                    <h2>Open Source</h2>
                    <p>
                        Nine Hub Tools is built with React, TypeScript, and modern web technologies.
                        The source code is available for learning and contribution.
                    </p>

                    <h2>Contact</h2>
                    <p>
                        Email: <a href="mailto:hello@nineproo.com">hello@nineproo.com</a><br />
                        Twitter: <a href="https://x.com/nine_proo">@nine_proo</a><br />
                        Instagram: <a href="https://instagram.com/nine_proo">@nine_proo</a>
                    </p>
                </article>
            </div>
        </Layout>
    );
}
