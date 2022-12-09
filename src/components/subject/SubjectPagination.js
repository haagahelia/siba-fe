import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

const pageSize = 15;


export default function SubjectPagination({subjectList, setSubjectListState}){

    const count = Math.ceil(subjectList.length/pageSize);
    const [pagination, setPagination] = useState({
        from: 0,
        to: pageSize
    })
    const [initialRender, setInitialRender] = useState(true);
    const [page, setPage]=useState(1)

    useEffect(() => {
        if(initialRender)
        {
            setInitialRender(false);
        }
        else
        {
            const slicedSubjects = subjectList.slice(pagination.from, pagination.to)
            console.log(slicedSubjects)
            setSubjectListState(slicedSubjects)
        }
    },[pagination])


    const handleChange = (e, p) => {
        const from = (p - 1) * pageSize;
        const to = (p - 1) * pageSize + pageSize;
        setPage(p)
        console.log(page)
        console.log(p)
        console.log(pagination)
        setPagination({...pagination, from: from, to: to})
    }

    return (
        <Pagination
            page={page}
            count={count}
            color="primary"
            onChange={handleChange}
        />
    )

}