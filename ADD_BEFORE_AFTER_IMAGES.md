# Adding More Before/After Image Pairs

The "EXPERTISE ET CONSEILS SUR MESURE" section is designed to support multiple before/after image pairs. Here's how to add more renovation projects:

## Quick Guide

### 1. Edit the beforeAfterData Array

Open `src/components/ui/before-after-gallery.tsx` and locate the `beforeAfterData` array:

```typescript
const beforeAfterData: BeforeAfterItem[] = [
  {
    id: 1,
    title: "Rénovation Complète Intérieure",
    description: "Transformation totale d'un espace de vie avec aménagement moderne et finitions haut de gamme",
    beforeImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_53_53_zd2zb7%20(1).png",
    afterImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_54_07_er2wbg%20(1).jpg",
    beforeAlt: "Avant rénovation - espace intérieur à rénover",
    afterAlt: "Après rénovation - intérieur moderne et rénové"
  },
  // Add more items here!
];
```

### 2. Add New Items

Add new before/after pairs following this template:

```typescript
{
  id: 2,
  title: "Rénovation Cuisine Moderne",
  description: "Transformation d'une cuisine vieillissante en espace moderne et fonctionnel",
  beforeImage: "https://your-image-url/kitchen-before.jpg",
  afterImage: "https://your-image-url/kitchen-after.jpg",
  beforeAlt: "Avant rénovation - cuisine ancienne",
  afterAlt: "Après rénovation - cuisine moderne"
},
{
  id: 3,
  title: "Salle de Bain Luxe",
  description: "Aménagement complet avec carrelage premium et équipements haut de gamme",
  beforeImage: "https://your-image-url/bathroom-before.jpg",
  afterImage: "https://your-image-url/bathroom-after.jpg",
  beforeAlt: "Avant rénovation - salle de bain basique",
  afterAlt: "Après rénovation - salle de bain luxe"
},
```

### 3. Required Fields

Each `BeforeAfterItem` object must contain:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | number | Unique identifier | 1, 2, 3, etc. |
| `title` | string | Project title displayed in navigation | "Rénovation Cuisine" |
| `description` | string | Short description of the project | "Transformation complète..." |
| `beforeImage` | string | Full URL to before photo | "https://..." |
| `afterImage` | string | Full URL to after photo | "https://..." |
| `beforeAlt` | string | Alt text for before image (accessibility) | "Avant rénovation - ..." |
| `afterAlt` | string | Alt text for after image (accessibility) | "Après rénovation - ..." |

## Image Requirements

### Image Format
- Supported formats: JPEG, PNG, WebP
- Recommended format: WebP (smallest file size, best quality)
- JPEG as fallback for better browser support

### Image Dimensions
- Aspect ratio: 16:9 or 4:3 recommended
- Min width: 800px
- Min height: 500px
- Max file size: 2MB per image (for optimal performance)

### Image Hosting
- Use Cloudflare R2 for reliable CDN delivery
- Or any other CDN/image hosting service
- Ensure CORS headers are properly configured
- Use HTTPS URLs only

## Example: Adding 3 More Projects

```typescript
const beforeAfterData: BeforeAfterItem[] = [
  {
    id: 1,
    title: "Rénovation Complète Intérieure",
    description: "Transformation totale d'un espace de vie avec aménagement moderne et finitions haut de gamme",
    beforeImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_53_53_zd2zb7%20(1).png",
    afterImage: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_54_07_er2wbg%20(1).jpg",
    beforeAlt: "Avant rénovation - espace intérieur à rénover",
    afterAlt: "Après rénovation - intérieur moderne et rénové"
  },
  {
    id: 2,
    title: "Rénovation Salle de Bain",
    description: "Salle de bain élégante avec douche italienne et carrelage haut de gamme",
    beforeImage: "https://example.com/bathroom/before.jpg",
    afterImage: "https://example.com/bathroom/after.jpg",
    beforeAlt: "Avant rénovation - salle de bain datée",
    afterAlt: "Après rénovation - salle de bain contemporaine"
  },
  {
    id: 3,
    title: "Rénovation Cuisine Ouverte",
    description: "Cuisine ouverte avec îlot central et équipements dernière génération",
    beforeImage: "https://example.com/kitchen/before.jpg",
    afterImage: "https://example.com/kitchen/after.jpg",
    beforeAlt: "Avant rénovation - cuisine fermée et sombre",
    afterAlt: "Après rénovation - cuisine ouverte et lumineuse"
  },
  {
    id: 4,
    title: "Rénovation Salon",
    description: "Transformation complète du salon avec peinture, revêtements et aménagement",
    beforeImage: "https://example.com/salon/before.jpg",
    afterImage: "https://example.com/salon/after.jpg",
    beforeAlt: "Avant rénovation - salon basique",
    afterAlt: "Après rénovation - salon moderne et accueillant"
  },
];
```

## What Automatically Updates

When you add new items to `beforeAfterData`:

✓ Navigation buttons (left/right arrows) automatically work with all items
✓ Progress indicator dots automatically add for each new item
✓ Image counter automatically shows correct total (e.g., "1 / 4")
✓ Click-to-navigate on dots works automatically
✓ Drag-to-navigate carousel works with all new items
✓ No additional code needed!

## Testing Your Changes

After adding new image pairs:

1. Save the file
2. Run `npm run build` to verify no errors
3. Test in development with `npm run dev`
4. Click through each image pair to verify:
   - Images load correctly
   - Slider drag works smoothly
   - Navigation buttons work
   - Progress dots highlight correctly
   - Counter shows correct numbers

## Troubleshooting

### Images Not Loading?
- Check image URLs are accessible and use HTTPS
- Verify CORS headers if images are on different domain
- Check browser console for 404 errors
- Ensure image format is supported (JPEG, PNG, WebP)

### Carousel Not Working?
- Verify ID values are unique and sequential
- Check BeforeAfterItem interface fields are all present
- Ensure beforeImage and afterImage URLs are valid
- Check browser console for JavaScript errors

### Performance Issues?
- Optimize image file sizes (use WebP format)
- Compress images to <2MB each
- Use CDN for image delivery (Cloudflare R2)
- Verify network connection in DevTools

## Best Practices

1. **Use Descriptive Titles**: Make project titles clear and professional
2. **Match Image Aspect Ratios**: Keep before/after image dimensions consistent
3. **Optimize File Sizes**: Compress without losing quality
4. **Use WebP Format**: Better compression than JPEG
5. **Add Detailed Alt Text**: Improves accessibility and SEO
6. **Consistent Lighting**: Take before/after photos in similar lighting
7. **Show Transformation**: Use angles that highlight the renovation work

## File Location

**File to edit**: `src/components/ui/before-after-gallery.tsx`

Look for the `beforeAfterData` constant (around line 15) and add your image pairs there.

---

That's it! The component automatically handles rendering, navigation, and all interactions. Just add your image data and everything works!
