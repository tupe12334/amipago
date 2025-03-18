import React from "react";
import { ExpenseDto } from "./types";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";

interface ExpensesListProps {
  expenses: ExpenseDto[];
  formatCurrency: (amount: number, currency: string) => string;
}

export const ExpensesList: React.FC<ExpensesListProps> = ({
  expenses,
  formatCurrency,
}) => {
  if (expenses.length === 0) {
    return (
      <Box
        id="expenses-empty-state"
        textAlign="center"
        py={3}
        bgcolor="grey.50"
        borderRadius={2}
      >
        <Typography variant="body2" color="text.secondary">
          אין הוצאות להצגה בקבוצה זו
        </Typography>
      </Box>
    );
  }

  return (
    <List
      id="expenses-list"
      aria-label="רשימת הוצאות"
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        "& > li:not(:last-child)": {
          borderBottom: 1,
          borderColor: "divider",
        },
      }}
    >
      {expenses.map((expense) => (
        <ListItem
          key={expense.id}
          id={`expense-item-${expense.id}`}
          sx={{ py: 1.5 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            width="100%"
          >
            <Box>
              <Typography variant="body1" fontWeight="medium">
                {expense.description || "הוצאה ללא תיאור"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span>שולם על ידי: {expense.payer}</span>
                <span style={{ marginInline: "0.5rem" }}>•</span>
                <span>
                  {new Date(expense.date).toLocaleDateString("he-IL")}
                </span>
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="bold" color="success.main">
              {formatCurrency(expense.amount, expense.currency)}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
