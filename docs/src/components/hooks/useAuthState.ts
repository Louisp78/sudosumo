import {useGetCurrentUserQuery} from "../../infra/redux/api/apiSlice";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUserId} from "../../infra/redux/slices/authSlice";

const useAuthState = () => {

    const dispatch = useDispatch();
    const {
        data : userDto,
        isLoading : isLoadingUser,
        isSuccess : isSuccessUser,
        isError : isErrorUser,
    } = useGetCurrentUserQuery();

    useEffect(() => {
        if (isSuccessUser){
            dispatch(setUserId(userDto?.id));
        }
    }, [dispatch,userDto]);
}

export default useAuthState;