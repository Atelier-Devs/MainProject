import React, { useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue

    }
    return parseInt(param)
}

const useCustomMove = () => {

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false)

    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get('page'),1)
    const size = getNum(queryParams.get('size'), 10)
    
    const queryDefault = createSearchParams({page,size}).toString() //새로추가
    

    //목록으로 이동
    const moveToList = (pageParam = {}) => {
        console.log(pageParam);
        //Safelt destructuring with default values
        let queryStr = ''
        if (pageParam) {
            //목록으로 이동할때 pageParam에 아무것도 전달되지 않으면 비어있는 기본 객체를 인자로 받아서 pageParam을 설정함
            //url에 현재 page와 페이지당 size가 destructuring 으로 page와 size에 저장되고 아무것도 넘어오지 않으면 기본값 page = 1, size= 10으로 결정된다
            const pageNum = getNum(pageParam.page, page)
            const sizeNum = getNum(pageParam.size, size)
            //프로젝트 할때도 넘어오는 데이터가 없으면 터지므로 undefined변수에 접근하려고 하면 터짐
            //그래서 사용하는곳에서 전달되는 값이 없을 경우 객체이면 {}를 기본값으로 설정하고, 배열이면 []로 선언하면 터지는 문제는 해결이 가능함.
            //기본자료형은 터질일은 없지만 없는 변수에 index로 배열에 접근하면 터지고 객체의 key에 접근하려고 하면 터짐
            queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString()
        } else {
            queryStr = queryDefault
        }
        navigate({ pathname: '../list', search: queryStr });
        setRefresh(!refresh)//moveToList 호출시 마다 기존 변수값을 true와 false로 번갈아 가면서 fresh 변수가 변경되면서
        //기존페이지에서는 호출되지 않는것을 호출될때마다 호출할수 있도록 값을 변경하여 refresh 변수가 변경되며 useEffect가
        //호출되도록 조절함, useEffect의 두번째 인자(배열의 값이 변경되면 첫번째 인자가 호출됨)
    };

    //수정으로 이동
    const moveToModify = (num) => { 
        console.log(queryDefault);
        navigate({
            pathname: `../modify/${num}`,
            search : queryDefault
        })
    }

    //조회로 이동, 여기에서 navigate에 객체로 인자를 전달하면서 path와 검색어를
    //전달하고 그것을 나중에 사용하려고 하고 custom Hook을 이용하여 재활용함
    const moveToRead = (num) => {
        console.log(queryDefault);
        navigate({
            pathname: `../read/${num}`,
            search: queryDefault
        })
    }
    //여기에서 정의함수 객체를 컴포넌트에서 반환하므로 사용하는 곳에서 destructuring해서 호출가능함
    return {moveToList, moveToModify, page, size , moveToRead, refresh}
}

export default useCustomMove