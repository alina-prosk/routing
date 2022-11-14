import { useEffect, useMemo, useState } from 'react';
import { getCustomers } from 'fakeApi';
import { SearchBox } from 'components/SearchBox';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') ?? '';
  const location = useLocation();

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  const changeFilter = value => {
    setSearchParams(value !== '' ? { filter: value } : {});
  };

  const visibleCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(filterParam.toLowerCase())
    );
  }, [customers, filterParam]);

  return (
    <main>
      <SearchBox value={filterParam} onChange={changeFilter} />
      {visibleCustomers.length > 0 && (
        <ul>
          {visibleCustomers.map(customer => (
            <li key={customer.id}>
              <Link to={`${customer.id}`} state={{ from: location }}>
                {customer.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Customers;
