import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: themas.colors.secondary,
    marginBottom: 16,
    marginTop: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 12,
    alignItems: "center", //
    justifyContent: "center",// se der merda exluir esses dois
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: themas.colors.secondary,
    textAlign: "center",
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  comingSoonCard: {
    backgroundColor: "#f0f0f0",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  comingSoonText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "600",
  },
});