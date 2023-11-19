import {useGetCurrentUserQuery} from "../infra/redux/api/apiSlice";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUserId} from "../infra/redux/slices/authSlice";
import {ApiConfig} from "../infra/redux/api/ApiConfig";

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
        } else if (isErrorUser) {
            ApiConfig.handleUnauthorized();
        }
    }, [dispatch, isSuccessUser, isErrorUser]);
}

export default useAuthState;