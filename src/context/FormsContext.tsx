import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormId {
  id: number;
  name: string;
}

interface FormContextProps {
  formIds: FormId[];
  addFormId: (id: FormId) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formIds, setFormIds] = useState<FormId[]>([]);

  const addFormId = (newId: FormId) => {
    const existIndex = formIds.findIndex((id) => id.name === newId.name);
    if (existIndex !== -1) {
      const copy = [...formIds];

      copy[existIndex] = newId;

      setFormIds(copy);
    } else {
      setFormIds((prevFormIds) => [...prevFormIds, newId]);
    }
  };

  return (
    <FormContext.Provider value={{ formIds, addFormId }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
