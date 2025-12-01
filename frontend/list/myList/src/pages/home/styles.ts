import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themes";

const { width } = Dimensions.get("window");

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themas.colors.bgScreen,
  },
  header: {
    height: 160,
    backgroundColor: themas.colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
    opacity: 0.9,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: themas.colors.secondary,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },

  // Grid 2x2 para os 4 primeiros cards
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "48%",
    marginBottom: 15,
  },
  smallCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: themas.colors.secondary,
    textAlign: "center",
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },

  // Card GRANDE - Criar Dieta
  largeCard: {
    backgroundColor: themas.colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  largeCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  largeCardIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  largeCardText: {
    flex: 1,
  },
  largeCardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  largeCardDescription: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    lineHeight: 20,
  },

  // Logo no final
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
});