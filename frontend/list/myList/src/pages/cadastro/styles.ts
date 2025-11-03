import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";



export const style = StyleSheet.create({
    container:{
        backgroundColor:themas.colors.bgScreen,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        

    },
    boxTop:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        //backgroundColor:'red',
        alignItems:'center',
        //justifyContent:'center',

    
    },
    boxMid:{
        height:Dimensions.get('window').height/4,
        width:'100%',
        paddingHorizontal:37
    },
    boxBotton:{
        marginTop:100,
        height:Dimensions.get('window').height/4,
        width:'100%',
        alignItems:'center',
        //backgroundColor:'red',
    },
    logo:{
       
       width:280,
       height:280 

    },
    text:{
        fontWeight:'bold',
        //marginBottom:100,
        fontSize:18
    },
    
    titleInput:{
        marginLeft:5,
        color:themas.colors.secondary,
        marginTop:20

    },
    BoxInput:{
        width:'100%',
        height:40,
        borderWidth:1,
        marginTop:10,
        flexDirection:'row',
        borderRadius:40,
        alignItems:'center',
        backgroundColor:themas.colors.lightGray,
        borderColor:themas.colors.lightGray,
        
    },
    input:{
        height:'100%',
        width:'90%',
        borderRadius:40,
        paddingLeft:8,
    },
    button:{
        marginTop:80,
        width:200,
        height:50,
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
    },
    textButton:{
        fontSize:16,
        color:themas.colors.secondary,
        fontWeight:'bold'
    },
    textButtom:{
        marginBottom:50,
        fontSize:16,
        color:themas.colors.gray,
    },
   


});