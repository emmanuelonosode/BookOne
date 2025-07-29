# SheetDB Setup Guide for Contact Form

## What is SheetDB?

SheetDB is a service that turns Google Sheets into a JSON API, allowing you to store form data directly in a Google Spreadsheet.

## Setup Instructions

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add these headers in the first row:
   ```
   timestamp | name | email | service | message | country | timezone | userAgent | source
   ```

### 2. Set up SheetDB

1. Go to [SheetDB.io](https://sheetdb.io)
2. Click "Create new API"
3. Connect your Google Sheet
4. Copy the API URL (it will look like: `https://sheetdb.io/api/v1/your-sheet-id`)

### 3. Configure Environment Variables

Add this to your `.env.local` file:

```bash
# SheetDB Configuration
SHEEET_URL_LEADS=https://sheetdb.io/api/v1/your-sheet-id-here

# Existing email configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

### 4. Test the Integration

1. Fill out the contact form on your website
2. Submit the form
3. Check both:
   - Your email inbox (for the email notification)
   - Your Google Sheet (for the data entry)

## Data Structure

The following data will be stored in your Google Sheet:

| Column    | Description                 | Example                      |
| --------- | --------------------------- | ---------------------------- |
| timestamp | When the form was submitted | 2025-01-28T20:30:00.000Z     |
| name      | Contact's full name         | John Doe                     |
| email     | Contact's email address     | john@example.com             |
| service   | Requested service           | Website Design & Building    |
| message   | Contact's message           | I need a new website...      |
| country   | Visitor's country           | Nigeria                      |
| timezone  | Visitor's timezone          | Africa/Lagos                 |
| userAgent | Browser information         | Mozilla/5.0...               |
| source    | Form source                 | BookOne Website Contact Form |

## Benefits

- **Backup Storage**: Data is stored even if email fails
- **Easy Analysis**: View all contacts in a spreadsheet
- **Export Options**: Download data as CSV/Excel
- **Real-time Updates**: Data appears instantly in your sheet
- **No Database Required**: Uses Google Sheets as your database

## Troubleshooting

### SheetDB URL not working?

- Make sure the URL is correct
- Check that your Google Sheet is publicly accessible
- Verify the sheet has the correct headers

### Data not appearing in sheet?

- Check the browser console for errors
- Verify your environment variables are set
- Ensure the sheet has write permissions

### Email working but SheetDB not?

- The form will still work with email only
- Check your SheetDB URL in the environment variables
- Verify the sheet structure matches the expected format

## Security Notes

- Your Google Sheet will be publicly accessible via the API
- Only store non-sensitive information
- Consider using a separate sheet for testing
- Regularly backup your data

## Advanced Configuration

You can customize the data structure by modifying the `sheetData` object in `/app/api/contact/route.js`.
