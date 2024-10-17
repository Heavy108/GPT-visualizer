import style from '@/css/Input.module.css';
export function Input(props){
    return(
        <>
        <div className={style.Input_field}>
            <label htmlFor={props.label}>{props.label}</label>
            <input type={props.type} name={props.label} placeholder={props.placeholder} />
        </div>
        </>
    )
}

export function Textarea(props){
    return(
        <>
        <div className={style.Input_field}>
            <label htmlFor="">{props.label}</label>
            <textarea type="text" placeholder={props.placeholder}  name={props.label}/>
        </div>
        </>
    )
}
