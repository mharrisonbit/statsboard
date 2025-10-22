import { navigate } from "../navigation/ref";
import { RootStackParamList } from "../navigation/types";


const useHomeViewModel = () => {
    const navButtonPress = (page: keyof RootStackParamList) => {
        navigate(page);
    };

    return { navButtonPress };
};

export default useHomeViewModel;