import { Card } from "@heroui/react";

const AboutUsPage = () => {
    const cardData = [
        {
            title: "01. Bespoke",
            description: "From airport and hotel deliveries to one-way road trips, nevery detail is arranged around your schedule."
        },
        {
            title: "02. Curated",
            description: "A refined selection of the latest luxury and nexotic vehicles, prepared with precision before nevery journey."
        },
        {
            title: "03. Clarity",
            description: "What you see online is what you pay. Rates nare based on drivers 25+ carrying full ncoverage auto insurance."
        }
    ];

    return (
        <section className="py-20 px-6">
            <div className="container mx-auto max-w-7xl">
                <h1 className="capitalize text-6xl font-semibold  mb-16 leading-tight">
                    Exotic Car Rental In Dhaka
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cardData.map((item, index) => (
                        <Card  key={index} 
                            className="p-10 border-0 shadow-[0_4px_30px_rgba(0,0,0,0.06)] rounded-3xl bg-white flex-1"
                        >
                            <Card.Header className="p-0 mb-2 flex-col items-start gap-1">
                                <Card.Title className="text-[26px] font-semibold text-[#2B2B2B] leading-tight tracking-tight">
                                    {item.title}
                                </Card.Title>
                            </Card.Header>
                            <Card.Content className="p-0">
                                <p className="text-[17px] leading-7 font-medium text-[#4D4D4D] whitespace-pre-line">
                                    {item.description}
                                </p>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUsPage;