import { ActiveTickets, CompletedRequest, Icon01 } from "@/components/lottie/registry"
import { ActivityCard } from "@dpds-gov/design-system"
import { CardWidget, CardWidgetContent, CardWidgetHeader, CardWidgetIcon, CardWidgetTitle } from "@dpds-gov/design-system"
import { StatCard } from "@dpds-gov/design-system"
import { WalletCards } from "@dpds-gov/design-system"
import { useTranslation } from "react-i18next"

const cardItems = [
  { titleKey: "cards.completedOrders", description: "124", lottieId: CompletedRequest },
  { titleKey: "cards.completedOrders", description: "124", lottieId: ActiveTickets },
  { titleKey: "cards.completedOrders", description: "45",  lottieId: Icon01 },
]

const statItems = [
  {
    title: "Total Requests",
    description: "248",
    glowPosition: "left-bottom" as const,
    data: [{ value: 28 }, { value: 35 }, { value: 30 }, { value: 42 }, { value: 38 }, { value: 50 }, { value: 248 }],
  },
  {
    title: "Completed",
    description: "186",
    glowPosition: "right-bottom" as const,
    data: [{ value: 40 }, { value: 55 }, { value: 48 }, { value: 70 }, { value: 90 }, { value: 120 }, { value: 186 }],
  },
  {
    title: "Under Investigation",
    description: "34",
    glowPosition: "left-top" as const,
    data: [{ value: 10 }, { value: 18 }, { value: 14 }, { value: 22 }, { value: 28 }, { value: 30 }, { value: 34 }],
  },
  {
    title: "Pending Approval",
    description: "28",
    glowPosition: "right-top" as const,
    data: [{ value: 5 }, { value: 12 }, { value: 8 }, { value: 16 }, { value: 20 }, { value: 24 }, { value: 28 }],
  },
]

export default function CardsPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div>
          <h1 className="text-[40px] font-bold font-mono tracking-tight  text-secondary-600 dark:text-success-300 text-4xl">{t("cards.title")}</h1>
          <p className=" text-sm md:text-2xl text-gray-500">{t("cards.subtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statItems.map((item, index) => (
            <StatCard
              key={`stat-${index}`}
              title={item.title}
              description={item.description}
              data={item.data}
              glowPosition={item.glowPosition}
              index={index}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardItems.map((item, index) => (
            <ActivityCard
              key={`activity-${index}`}
              title={t(item.titleKey)}
              description={item.description}
              lottieId={item.lottieId}
            />
          ))}
        </div>


        <div className="grid gap-4 md:grid-cols-2 ">
          {cardItems.map((item, index) => (
            <CardWidget key={`widget-${index}`}>
              <CardWidgetHeader>
                <CardWidgetIcon>
                  <div className="rounded-2xl p-2 bg-primary-25 dark:bg-emerald-50/10">
                    <div className="aspect-square relative">
                      <img src="/img/icon-channel.svg" alt={t(item.titleKey)} />
                    </div>
                  </div>
                </CardWidgetIcon>
                <CardWidgetTitle>{t(item.titleKey)}</CardWidgetTitle>
              </CardWidgetHeader>
              <CardWidgetContent>
                sdf
              </CardWidgetContent>
            </CardWidget>
          ))}
        </div>

        {/* Wallet Cards demo */}
        <div>
          <h2 className="text-xl font-mono font-bold mb-6 text-foreground">Wallet Cards</h2>
          <div className="flex flex-wrap gap-16 items-start justify-start">
            <WalletCards
              balance="$150,000"
              balanceLabel="Total Balance"
              cards={[
                {
                  gradient: ["oklch(0.58 0.09 200)", "oklch(0.40 0.11 200)"],
                  label: "Dubai Police HQ",
                  amount: "$42,000",
                  amountLabel: "Service",
                },
                {
                  gradient: ["var(--chart-primary)", "oklch(0.45 0.18 152)"],
                  label: "Active License",
                  amount: "$68,000",
                  amountLabel: "Legal",
                },
                {
                  gradient: ["oklch(0.60 0.18 12)", "oklch(0.42 0.20 12)"],
                  label: "Emergency Access",
                  amount: "$40,000",
                  amountLabel: "Priority",
                },
              ]}
            />

            <WalletCards
              balance="$55,000"
              balanceLabel="Station Balance"
              cards={[
                {
                  gradient: ["oklch(0.62 0.13 57)", "oklch(0.46 0.15 57)"],
                  label: "Al Barsha Station",
                  amount: "$28,000",
                  amountLabel: "Station",
                },
                {
                  gradient: ["oklch(0.62 0.23 303)", "oklch(0.44 0.25 303)"],
                  label: "Investigation Unit",
                  amount: "$27,000",
                  amountLabel: "Unit",
                },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

