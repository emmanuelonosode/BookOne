import { PortableText } from "@portabletext/react";

// Test table data
const testTableData = {
  _type: "table",
  caption: "Sample Table",
  rows: [
    {
      _type: "row",
      cells: [
        {
          _type: "cell",
          content: [
            { _type: "block", children: [{ _type: "span", text: "Name" }] },
          ],
          isHeader: true,
        },
        {
          _type: "cell",
          content: [
            { _type: "block", children: [{ _type: "span", text: "Age" }] },
          ],
          isHeader: true,
        },
        {
          _type: "cell",
          content: [
            { _type: "block", children: [{ _type: "span", text: "City" }] },
          ],
          isHeader: true,
        },
      ],
    },
    {
      _type: "row",
      cells: [
        {
          _type: "cell",
          content: [
            { _type: "block", children: [{ _type: "span", text: "John Doe" }] },
          ],
          isHeader: false,
        },
        {
          _type: "cell",
          content: [
            { _type: "block", children: [{ _type: "span", text: "30" }] },
          ],
          isHeader: false,
        },
        {
          _type: "cell",
          content: [
            { _type: "block", children: [{ _type: "span", text: "New York" }] },
          ],
          isHeader: false,
        },
      ],
    },
    {
      _type: "row",
      cells: [
        {
          _type: "cell",
          content: [
            {
              _type: "block",
              children: [{ _type: "span", text: "Jane Smith" }],
            },
          ],
          isHeader: false,
        },
        {
          _type: "cell",
          content: [
            { _type: "block", children: [{ _type: "span", text: "25" }] },
          ],
          isHeader: false,
        },
        {
          _type: "cell",
          content: [
            {
              _type: "block",
              children: [{ _type: "span", text: "Los Angeles" }],
            },
          ],
          isHeader: false,
        },
      ],
    },
  ],
};

const portableComponents = {
  types: {
    table: ({ value }) => {
      if (!value || !value.rows || value.rows.length === 0) return null;

      return (
        <div className="my-8 overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            {value.caption && (
              <caption className="text-sm text-gray-600 dark:text-gray-400 px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
                {value.caption}
              </caption>
            )}
            <tbody>
              {value.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  {row.cells.map((cell, cellIndex) => {
                    const CellTag = cell.isHeader ? "th" : "td";
                    return (
                      <CellTag
                        key={cellIndex}
                        className={`px-3 md:px-4 py-2 md:py-3 text-left border-b border-gray-300 dark:border-gray-600 text-sm md:text-base ${
                          cell.isHeader
                            ? "font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {cell.content && cell.content.length > 0 ? (
                          <PortableText
                            value={cell.content}
                            components={{
                              block: {
                                normal: ({ children }) => (
                                  <span>{children}</span>
                                ),
                              },
                              marks: {
                                strong: ({ children }) => (
                                  <strong className="font-bold">
                                    {children}
                                  </strong>
                                ),
                                em: ({ children }) => (
                                  <em className="italic">{children}</em>
                                ),
                                code: ({ children }) => (
                                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs md:text-sm font-mono">
                                    {children}
                                  </code>
                                ),
                              },
                            }}
                          />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </CellTag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

export default function TestTablePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Table Component Test</h1>

      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          This is a test of the table component. Below you should see a properly
          formatted table:
        </p>

        <PortableText value={[testTableData]} components={portableComponents} />

        <p className="mt-8">The table above should display with:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>Proper header styling (bold background)</li>
          <li>Alternating row colors</li>
          <li>Responsive design with horizontal scroll on mobile</li>
          <li>Caption at the top</li>
          <li>Hover effects on rows</li>
          <li>
            Optimized text sizes for mobile (smaller on mobile, normal on
            desktop)
          </li>
          <li>Proper spacing that adapts to screen size</li>
        </ul>
      </div>
    </div>
  );
}
