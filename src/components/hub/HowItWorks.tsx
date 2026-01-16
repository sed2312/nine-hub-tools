export function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: 'Choose Your Tool',
            description: 'Select from 9 specialized generators for CSS, design, and SEO',
            icon: '🎯'
        },
        {
            number: 2,
            title: 'Customize in Real-Time',
            description: 'Adjust settings with instant live preview of your design',
            icon: '⚡'
        },
        {
            number: 3,
            title: 'Copy & Ship',
            description: 'One-click copy for production-ready CSS, React, or Tailwind code',
            icon: '🚀'
        }
    ];

    return (
        <section className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        How It <span className="text-primary">Works</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        From idea to implementation in 3 simple steps
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {steps.map((step) => (
                        <div key={step.number} className="text-center">
                            <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-3xl">{step.icon}</span>
                            </div>
                            <div className="mb-2 text-sm font-bold text-primary">
                                STEP {step.number}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
