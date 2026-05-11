# Heidi's Hair Salon Website

Static website for Heidi's Hair Salon, a private home hair salon in Lethbridge, Alberta.

Live site: https://heidishairsalon.ca/

## Project Purpose

This website gives clients a fast, mobile-friendly way to learn about Heidi's Hair Salon, review services and pricing, browse recent hair work, and contact Heidi to book an appointment.

## Business Overview

Heidi's Hair Salon offers a private salon experience with professional results in Lethbridge, Alberta. Services include haircuts, wash and style, colour services, highlights, treatments, smoothing, seniors' services, men's cuts, and children's cuts by appointment only.

## Main Pages

- `index.html`: Homepage, hero, service summary, reviews, contact/location
- `services.html`: Service categories and booking prompts
- `pricing.html`: Starting prices and quote guidance
- `gallery.html`: Recent haircut and colour gallery
- `about.html`: About Heidi and the salon experience
- `contact.html`: Phone, email, location, map, Facebook, Google review link
- `privacy.html`: Website privacy policy
- `404.html`: GitHub Pages custom not-found page

## File And Folder Structure

```text
.
|-- 404.html
|-- CNAME
|-- README.md
|-- about.html
|-- contact.html
|-- gallery.html
|-- index.html
|-- pricing.html
|-- privacy.html
|-- robots.txt
|-- script.js
|-- services.html
|-- sitemap.xml
|-- styles.css
`-- Images/
    |-- optimized/
    |-- og-image.png
    |-- heidis-hair-salon-logo-160.png
    |-- SalonA.png
    |-- optimized/
    `-- original salon and gallery image assets
```

## Key Features

- Responsive navigation with mobile menu
- Clear call, email, directions, Facebook, and review links
- Lazy-loaded below-the-fold images and Google Maps iframe
- Gallery carousel controls
- Local business schema on the homepage
- Google Analytics and Google Ads event tracking
- Custom GitHub Pages-compatible `404.html`

## SEO Features

- Unique title and meta description on each HTML page
- Canonical URLs using `https://heidishairsalon.ca/`
- Open Graph and Twitter card tags on each page
- Shared social image: `https://heidishairsalon.ca/Images/og-image.png`
- `sitemap.xml` with final indexable URLs only
- `robots.txt` allowing crawl and referencing the sitemap
- `404.html` uses `noindex, follow`

## Analytics And Event Tracking

Analytics uses one `gtag.js` library load per page and configures both IDs:

- GA4: `G-0PMNT4Z1PG`
- Google Ads: `AW-18136060932`

`script.js` tracks phone clicks, email clicks, Facebook clicks, review clicks, directions clicks, booking-style CTA clicks, and contact form submissions if a contact form is added later.

## Image And Asset Notes

- Original high-resolution PNG files are kept in `Images/`.
- Visible performance-friendly derivatives are stored in `Images/optimized/`.
- Homepage hero uses responsive JPG derivatives generated from `Images/SalonA.png`, with `Images/SalonA.png` kept as the fallback source.
- Gallery images use optimized 720px-wide JPG versions.
- Heidi portrait and salon room below-the-fold images use optimized JPG versions.
- The Open Graph image is for social sharing metadata and is not used as a visible page image.

## Sitemap And Robots

`sitemap.xml` lists only final production URLs:

- `https://heidishairsalon.ca/`
- `https://heidishairsalon.ca/services.html`
- `https://heidishairsalon.ca/pricing.html`
- `https://heidishairsalon.ca/gallery.html`
- `https://heidishairsalon.ca/about.html`
- `https://heidishairsalon.ca/contact.html`
- `https://heidishairsalon.ca/privacy.html`

`robots.txt` allows crawling and points to `https://heidishairsalon.ca/sitemap.xml`.

## 404 Page

`404.html` is a branded custom not-found page for GitHub Pages. It includes the main navigation, Heidi's Hair Salon logo, noindex metadata, helpful CTAs, and contact details.

## Performance Notes

- Critical homepage hero image uses responsive `Images/optimized/salon-hero-*.jpg` derivatives from `Images/SalonA.png` with `fetchpriority="high"`.
- Non-critical images use `loading="lazy"` and `decoding="async"`.
- Image `width` and `height` attributes are set to reduce layout shift.
- Google Maps iframe is lazy-loaded.
- `script.js` is loaded with `defer`.
- Google tag loading is consolidated to one external script request per page.
- No build step or client-side framework is required.

## Accessibility Notes

- Pages use one clear `h1`.
- Images include descriptive `alt` text.
- Skip link is included for keyboard users.
- Buttons and navigation links have large tap targets.
- Focus-visible styles are defined in CSS.
- Layout was checked at desktop and mobile widths after the performance changes.

## Deployment Notes

This is a static site suitable for GitHub Pages. The `CNAME` file points the project to:

```text
heidishairsalon.ca
```

Deploy the repository contents as-is. There is no package install or build command.

## GitHub Pages Notes

- Keep `404.html` in the repository root so GitHub Pages serves it automatically.
- Keep `CNAME` in the repository root for the custom domain.
- Use the non-www HTTPS domain as the preferred URL: `https://heidishairsalon.ca/`.
- Do not add redirected URLs, `404.html`, image-only URLs, or test pages to `sitemap.xml`.

## Maintenance Checklist

- Confirm phone number, email, address, and service details are current.
- Update prices when service pricing changes.
- Replace gallery images with optimized assets, not multi-megabyte originals.
- Keep every visible image's `width`, `height`, and `alt` attributes accurate.
- Re-test internal links after adding or renaming pages.
- Keep `sitemap.xml` current when pages change.
- Confirm `robots.txt` still references the production sitemap.
- Check Google Search Console after deployments.
- Check social sharing previews after changing Open Graph metadata.
- Keep analytics IDs unchanged unless the business intentionally changes accounts.

## Future Improvement Ideas

- Add WebP or AVIF image variants if the project later adopts a formal asset workflow.
- Add a simple build script for repeatable image compression.
- Add a lightweight local link checker script.
- Add a privacy-safe contact form only if Heidi wants form submissions.
- Add a small appointment FAQ if clients ask recurring booking questions.

## Troubleshooting

- If images do not load after deploy, check filename case. GitHub Pages paths are case-sensitive.
- If social previews show an old image, clear the platform cache with the Facebook Sharing Debugger or LinkedIn Post Inspector.
- If Search Console reports "Page with redirect," check whether the reported URL is `http`, `www`, or `/index.html`; those may be external/legacy URLs rather than current internal links.
- If the 404 page does not appear on GitHub Pages, confirm the file is named exactly `404.html` and is in the repository root.
- If analytics events stop appearing, confirm `gtag.js`, `script.js`, phone links, email links, and CTA classes are still present.

## Author / Developer Credit

Website maintained for Heidi's Hair Salon by Jason Wilmot.
