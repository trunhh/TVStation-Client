 
import { SectorConst,StatusConst,ObjectTypeConst, GenreConst} from '../constants/constants'; 
import { CustomToggle, CustomInputSearch } from '../_sharecomponents/customrsuite/CustomRsuite';
import { CustomFormSelect } from '../_sharecomponents/customrsuite/CustomRsuite';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import siteMapActions from '../actions/siteMapActions';
import usersActions from '../actions/usersActions';
import { Form } from 'react-bootstrap';


const FilterForm = ({query, setQuery}) => {
  const siteMaps = useSelector((state) => state.siteMap.list);
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();

  const filterFormProps = {
    year: {
      data: Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - 1 + index),
      getValue: (item)=>item,
      getLabel: (item)=>item,
      label: "Năm"
    },
    sector: {
      data: SectorConst,
      label: "Loại hình"
    },
    status: {
      data: StatusConst,
      label: "Trạng thái"
    },
    objectType: {
      data: ObjectTypeConst,
      label: "Nguồn"
    },
    genre: {
      data: GenreConst,
      label: "loại"

    },
    sitemap: {
      data: siteMaps ?? [],
      getValue: (item)=>item.id,
      getLabel: (item)=>item.name,
      label: "Phòng ban"
    },
    users: {
      data: users ?? [],
      getValue: (item)=>item.userName,
      getLabel: (item)=>item.name,
      label: "Người dùng"
    },
  }

  const handleQueryChange = (e) => {
      const { name, value} = e.target;
      setQuery(prevQuery => ({
          ...prevQuery,
          [name]: value
      }));
  };

  useEffect(() => {
    dispatch(siteMapActions.getList());
    dispatch(usersActions.getList());
 }, []);

  return ( 
    <Form className="row row-gap-3" >
        {Object.keys(query).map((key) => {
          let props = {
            key: key,
            name: key,
            onChange: handleQueryChange,
            value: query[key] ?? ''
          }

          return (
            <div className="w-50">
              {(() => {
                switch (key) {
                  case "isPersonal":
                    return (<CustomToggle {...props}/>)
                  case "keyword":
                    return (<CustomInputSearch className="h-100" {...props}/>)
                  default:
                    return (<CustomFormSelect {...props} {...filterFormProps[key]}/>)
                }
              })()}
            </div>
          )
        })}
    </Form>
  )

}

export default FilterForm;