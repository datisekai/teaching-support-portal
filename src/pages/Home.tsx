const stats = [
  { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
  { id: 2, name: 'Assets under holding', value: '$119 trillion' },
  { id: 3, name: 'New users annually', value: '46,000' },
]

export default function Home() {
  return (
    <div className="tw-bg-white tw-py-24 sm:tw-py-32">
      <div className="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-8">
        <dl className="tw-grid tw-grid-cols-1 tw-gap-x-8 tw-gap-y-16 tw-text-center lg:tw-grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="tw-mx-auto tw-flex tw-max-w-xs tw-flex-col tw-gap-y-4">
              <dt className="tw-text-base/7 tw-text-gray-600">{stat.name}</dt>
              <dd className="tw-order-first tw-text-3xl tw-font-semibold tw-tracking-tight tw-text-gray-900 sm:tw-text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
