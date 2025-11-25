import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:themas.colors.bgScreen,
    padding: 20,
  },

  title: {
    fontSize: 38,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 30,
    color: themas.colors.primary,
    textTransform: "uppercase",
  },

  card: {
    width: "100%",
    padding: 25,
    borderRadius: 25,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },

  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },

  value: {
    fontSize: 28,
    fontWeight: "bold",
    color:  themas.colors.primary,
    marginBottom: 12,
    marginLeft: 5,
  },

  buttonArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  buttonBack: {
    flex: 0.45,
    backgroundColor: "#cfcac0",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonSave: {
    flex: 0.45,
    backgroundColor:  themas.colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonTextBack: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },

  buttonTextSave: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
