import { BookForm } from "@/validations/bookForm.schema";
import { useMutation } from "@tanstack/react-query"
import { aiData } from "../data/ai";

export const useMutationAi = () => {
  const suggest = useMutation({
    mutationKey: ["ai", "suggest"],
    mutationFn: async (book: BookForm) => {
      return aiData.suggest(book);
    },
    
  });
  const gramaticalImprovement = useMutation({
    mutationKey: ["ai", "gramaticalImprovement"],
    mutationFn: async (book: BookForm) => {
      return aiData.gramaticalImprovement(book);
    }
  });

  return {
    suggest,
    gramaticalImprovement
  };
}