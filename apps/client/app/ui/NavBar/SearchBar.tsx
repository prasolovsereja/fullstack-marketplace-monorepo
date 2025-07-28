import Button from "@/app/ui/NavBar/Button";

const SearchBar = () => {
  return (
      <div className='rounded-3 d-flex w-50'>
          <form action='/api/search' className='w-100'>
              <div className='d-flex flex-row w-100'>
                  <div className='w-75'>
                      <input name='search' type='text'  placeholder='Искать товары' className='h-100 w-100 border-end-0 rounded-1'/>
                  </div>
                  <div className='w-25'>
                      <Button type="submit" className='btn btn-primary mr-3 rounded-md'>
                          Поиск
                      </Button>
                  </div>
              </div>
          </form>
      </div>
  )
}

export default SearchBar;