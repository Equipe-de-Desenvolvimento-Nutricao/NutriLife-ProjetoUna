import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import Imc from "../pages/imc";
import Get from "../pages/get";
import TabBar from "../components/CustomTabBar";  

const Tab = createBottomTabNavigator();

export default function BottomRoutes(){
    return(
        <Tab.Navigator
            screenOptions={
                {headerShown:false
                }}
                tabBar={props => <TabBar {...props} />} >
            <Tab.Screen
                name="Home"
                component={Home}
            ></Tab.Screen>
            <Tab.Screen
                name="Imc"
                component={Imc}
            ></Tab.Screen>
            <Tab.Screen
                name="Get"
                component={Get}
            ></Tab.Screen>
        </Tab.Navigator>
    )
}