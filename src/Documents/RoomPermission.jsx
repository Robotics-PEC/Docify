import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export const RoomPermission = ({ formData }) => {
  const formatDate = (date) => {
    if (!date) return "N/A";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 14,
      flexDirection: "column",
    },
    Heading1: {
      fontSize: 22,
      fontFamily: "Times-Roman",
      textAlign: "center",
    },
    Heading2: {
      fontSize: 20,
      fontFamily: "Times-Bold",
      textAlign: "center",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "50%",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#000",
      padding: 5,
    },
    tableCellMain: {
      fontSize: 14,
      fontFamily: "Times-Bold",
    },
    tableCell: {
      fontSize: 14,
      fontFamily: "Times-Roman",
    },
    lastCol: {
      borderRightWidth: 0,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    note: {
      marginTop: 50,
      fontFamily: "Times-Italic",
      fontSize: 14,
    },
    signatureContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 50,
    },
    signature: {
      fontFamily: "Times-Bold",
      fontSize: 14,
    },
    signatureLeft: {
      textAlign: "left",
    },
    signatureRight: {
      textAlign: "right",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.Heading1}>
            Punjab Engineering College (Deemed to be University) Chandigarh
          </Text>
        </View>

        <View style={{ margin: 20 }}></View>

        <View style={styles.Heading2}>
          <Text>PERFORMA FOR BOOKING OF LECTURE ROOMS BY</Text>
          <Text>CLUBS/SOCIETIES/NSS/NCC/SPORTS</Text>
          <Text>& DEPARTMENTS</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            {[
              { label: "Name of Society", value: formData.society },
              { label: "Event Name", value: formData.eventName },
              {
                label: "Date",
                value: `${formatDate(formData.fromDate)} - ${formatDate(
                  formData.toDate
                )}`,
              },
              {
                label: "Time",
                value: `${formatTime(formData.fromTime)} - ${formatTime(
                  formData.toTime
                )}`,
              },
              { label: "Room Number", value: formData.roomNumber },
              { label: "Department", value: formData.department },
              {
                label: "Brief Event Description",
                value: formData.eventDescription,
              },
            ].map((row, index, array) => (
              <View
                style={[
                  styles.tableRow,
                  index === array.length - 1 && styles.lastRow,
                ]}
                key={row.label}
              >
                <View
                  style={[
                    styles.tableCol,
                    index === array.length - 1 && styles.lastRow,
                  ]}
                >
                  <Text style={styles.tableCellMain}>{row.label}:</Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    styles.lastCol,
                    index === array.length - 1 && styles.lastRow,
                  ]}
                >
                  <Text style={styles.tableCell}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.note}>
            <Text>
              Note: The undersigned takes full responsibility for any damage to
              the institute’s property in the above-mentioned rooms during the
              specified time.
            </Text>
          </View>

          <View style={styles.signatureContainer}>
            <Text style={[styles.signature, styles.signatureLeft]}>
              (Secretary/J. Secretary)
            </Text>
            <Text style={[styles.signature, styles.signatureRight]}>
              (CCS/CSTS)
            </Text>
          </View>

          <View style={styles.signatureContainer}>
            <Text style={[styles.signature, styles.signatureLeft]}>
              (Officer Incharge)
            </Text>
            <Text style={[styles.signature, styles.signatureRight]}>
              (ADSA)
            </Text>
          </View>

          <View style={styles.signatureContainer}>
            <Text style={[styles.signature, styles.signatureLeft]}>
              (DSA)
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
