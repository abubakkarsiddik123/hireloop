import { Card } from "@heroui/react";

const StatCard = ({ stats }) => {
  return (
    <section className="w-full bg-[#111111] px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1248px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[22px]">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.id}
                className="
                  h-[174px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#3a3a3a]
                  bg-[#1a1a1a]
                  shadow-none
                "
              >
                <Card.Content
                  className="
                    flex
                    h-full
                    flex-col
                    items-start
                    px-[22px]
                    py-[22px]
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-[40px]
                      w-[38px]
                      items-center
                      justify-center
                      rounded-[7px]
                      bg-[#353535]
                    "
                  >
                    <Icon className="h-[21px] w-[21px] text-[#d5d5d5]" />
                  </div>

                  {/* Label */}
                  <p
                    className="
                      mt-[31px]
                      text-[14px]
                      font-normal
                      leading-none
                      text-[#b9b9b9]
                    "
                  >
                    {stat.label}
                  </p>

                  {/* Value */}
                  <p
                    className="
                      mt-[18px]
                      text-[24px]
                      font-normal
                      leading-none
                      tracking-[-0.3px]
                      text-white
                    "
                  >
                    {stat.value}
                  </p>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatCard;
