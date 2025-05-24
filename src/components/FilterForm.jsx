import { CustomFormInput} from '../_sharecomponents/customrsuite/CustomRsuite';
import { CustomFormSelect } from '../_sharecomponents/customrsuite/CustomRsuite';
import { Form } from 'react-bootstrap';


const FilterForm = ({form, setForm, fieldProps}) => {

  // const filterFormProps2 = {
  //   status: { data: StatusConst, label: "Trạng thái" },
  //   duration: { data: DurationConst, label: "Thời lượng"},
  //   //frequency: { data: DayOfWeekConst, label: "Quy luật", required: true },
  //   frequency: { type: "email", required: true, list: "iw", multiple: true, children: (<DayOfWeekConst id="iw"/>), label: "Lặp lại" },
  //   siteMap: { data: siteMap, label: "Phòng ban" },
  //   channel: { data: channel, label: "Kênh phát sóng" },
  //   users: { data: users, label: "Người dùng" },
  //   startDate: { type: "date", label: "Ngày bắt dầu"},
  //   startTime: { type: "time", label: "Giờ bắt đầu" },
  //   start: { type: "datetime", label: "Bắt dầu" },
  //   end: { type: "datetime", label: "Kết thúc" },
  //   episodeNumber: { type: "number", label: "Số tập", min: 1 },
  //   keyword: { type: "search", label: "Tìm kiếm" }
  // }

  const handleQueryChange = (e) => {
      const { name, value} = e.target;
      setForm(prevQuery => ({
          ...prevQuery,
          [name]: value
      }));
  };


  return ( 
    <Form className="row row-gap-3" >
        {Object.keys(form).map((key, index) => {
          if (!fieldProps[key]) return null;

          let props = {
            key: key,
            name: key,
            onChange: handleQueryChange,
            value: form[key] ?? '',
            ...fieldProps[key]
          }

          
          return (
            <div className="w-50" key={index}>
              {(() => {
                if (props.type != null) return <CustomFormInput {...props}/>;
                else if (props.data != null) return <CustomFormSelect {...props} />;
                else return null
              })()}
            </div>
          )
        })}
    </Form>
  )

}

export default FilterForm;