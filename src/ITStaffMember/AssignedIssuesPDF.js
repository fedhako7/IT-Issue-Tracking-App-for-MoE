// AssignedIssuesPDF.jsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  issueContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
});

// Create PDF component
const AssignedIssuesPDF = ({ issues }) => {
  console.log("Issues:", issues); // Log the issues array
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Assigned Issues Report</Text>
          {issues.map((issue, index) => (
            <View key={index} style={styles.issueContainer}>
              <Text style={styles.label}>Issue title: {issue.title}</Text>
              <Text style={styles.label}>Category: {issue.category}</Text>
              <Text style={styles.label}>Description: {issue.description}</Text>
              <Text style={styles.label}>Status: {issue.status}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default AssignedIssuesPDF;
