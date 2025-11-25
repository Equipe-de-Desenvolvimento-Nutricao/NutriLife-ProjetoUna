import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    tabArea:{
        flexDirection:'row',
        height:88,
      justifyContent:'space-around',
      backgroundColor:themas.colors.bgScreen,
    },
    tabItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        
    },
    tabItemButtom:{
        width:70,
        height:70,
        borderRadius:35,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        zIndex:9999,
        backgroundColor:themas.colors.primary,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,

    },
    tabText:{
        fontSize:20,
        fontWeight:'bold',

    },
    botton:{
        width:100,
        height:50,
        alignSelf:'center',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themas.colors.primary,
        borderRadius:40,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }

    
});