import { Button, ButtonContainer, ButtonItem } from './styles'

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
  const pages = Math.ceil(total / limit)
  const first = Math.max(current - MAX_LEFT, 1)

  function onPageChange(page: number) {
    setOffset((page - 1) * limit)
    handleSearch()
  }

  return (
    <ButtonContainer>
      <Button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        Anterior
      </Button>
      <ul className="pagination">
        {Array.from({ length: Math.min(MAX_ITEMS, pages) })
          .map((_, index) => index + first)
          .map((page) => (
            <li key={page}>
              <ButtonItem
                onClick={() => onPageChange(page)}
                focusCurrentPage={page === current}
              >
                {page}
              </ButtonItem>
            </li>
          ))}
      </ul>
      <Button
        onClick={() => onPageChange(current + 1)}
        disabled={current === pages}
      >
        Próxima
      </Button>
    </ButtonContainer>
  )
}

export default Pagination
