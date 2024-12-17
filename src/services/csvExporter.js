

export const csvExporter = (data, filename) => {
    const headers = Object.keys(data[0]).join(","); // CSV headers
    const rows = data.map((row) => Object.values(row).join(",")).join("\n"); // CSV rows
    const csvData = `${headers}\n${rows}`; // Convert data to CSV
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" }); // Create a Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename + ".csv"; // File name
    link.click();
};