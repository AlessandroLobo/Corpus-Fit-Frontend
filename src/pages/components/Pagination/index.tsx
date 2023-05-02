interface PaginationProps {
  limit: number
  total: number
  offset: number
  setOffset: (offset: number) => void
  handleSearch: () => void //
}

const MAX_ITEMS = 9
const MAX_LEFT = (MAX_ITEMS - 1) / 2

const Pagination = ({
  limit,
  total,
  offset,
  setOffset,
  handleSearch,
}: PaginationProps) => {
  const current = offset ? offset / limit + 1 : 1
  console.log('Offset Fora da Funçao', offset)
  const pages = Math.ceil(total / limit)
  const first = Math.max(current - MAX_LEFT, 1)

  function onPageChange(page: number) {
    setOffset((page - 1) * limit)
    console.log('Offset--', offset)
    console.log('Page--', page)
    handleSearch()
  }

  return (
    <ul className="pagination">
      <li>
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
        >
          Anterior
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={
                page === current ? 'pagination__item--active' : undefined
              }
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === pages}
        >
          Próxima
        </button>
      </li>
    </ul>
  )
}

export default Pagination
