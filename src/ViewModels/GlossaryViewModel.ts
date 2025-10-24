import { useRef, useState } from "react";
import { Alert, FlatList } from "react-native";
import useNHLDataManager from "../Data/DataManager";
import { NHLGlossary, Term } from "../Models/NHLGlossary";

const useGlossaryViewModel = () => {
  const { isLoading, getGlossaryInfo } = useNHLDataManager();
  const [terms, setTerms] = useState<NHLGlossary>({ data: [], total: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const scrollViewRef = useRef<FlatList<Term> | null>(null);

  /** Fetch glossary data */
  const buildGlossary = async () => {
    try {
      const data = await getGlossaryInfo();
      setTerms(data ?? { data: [], total: 0 });
    } catch (error) {
      console.error("Failed to load glossary:", error);
      Alert.alert("Error", "Unable to load glossary data.");
    }
  };

  /** Search for a term and scroll to it, then highlight */
  const searchByTerm = (term: string) => {
    if (!term.trim()) {
      Alert.alert("Please enter a search term.");
      return;
    }

    const lowerQuery = term.toLowerCase();
    const list = terms.data ?? [];

    const results = list.filter(
      (item) =>
        item.fullName?.toLowerCase().includes(lowerQuery) ||
        item.abbreviation?.toLowerCase().includes(lowerQuery) ||
        item.definition?.toLowerCase().includes(lowerQuery)
    );

    if (results.length === 0) {
      Alert.alert("No results found.");
      return;
    }

    const result = results[0];
    const foundIndex = list.findIndex((i) => i.id === result.id);

    if (foundIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollToIndex({
        index: foundIndex,
        animated: true,
        viewPosition: 0.3,
      });

      // briefly highlight the found item
      setHighlightedId(result.id ?? null);
      setTimeout(() => setHighlightedId(null), 1500);
    }

    setSearchTerm("");
  };

  return {
    isLoading,
    terms,
    searchTerm,
    highlightedId,
    scrollViewRef,
    setSearchTerm,
    buildGlossary,
    searchByTerm,
  };
};

export default useGlossaryViewModel;
