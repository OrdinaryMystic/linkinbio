# How to Toggle TikTok Live Mode

## Quick Instructions

To switch between regular booking mode and TikTok live mode:

1. Open the file `live-config.js`
2. Change the value:
   - `const isLiveOnTikTok = false;` (Regular booking mode)
   - `const isLiveOnTikTok = true;` (TikTok live mode)
3. Save the file
4. Refresh your page

## What Changes When Live?

### TikTok Live Mode (`true`)

- **Page title**: "Book a TikTok Live Reading ($10)" with animated red LIVE indicator
- **Description**: "Please send $10 to my CashApp or PayPal after submitting this form."
- **Form fields**: Simplified to just:
  - Birth Date
  - Birth Time
  - Birth Location
  - TikTok Handle
  - Confidence in birth time
  - Astrology experience
  - Single focus area
- **Payment links**: Cash App and PayPal buttons displayed prominently

### Regular Booking Mode (`false`)

- **Page title**: "Book a Reading"
- **Description**: Standard intro with FAQ link
- **Form fields**: Full booking form with:
  - Name
  - Email
  - Reading Type (Mini $20 / Full $50 / Birthday $50)
  - Reading Format (Zoom / Recorded)
  - All birth info
  - Confidence & experience
  - Focus area (optional)
- **Payment links**: Hidden

That's it! Just edit one line in `live-config.js` and you're all set.
