# Add levqor.ai Custom Domain to Vercel

## Quick Setup (5 minutes)

### Step 1: Add Domain in Vercel

1. Go to your project settings:
   **https://vercel.com/vii-77s-projects/levqor-site/settings/domains**

2. Click **"Add"** button

3. Enter domain: `levqor.ai`

4. Click **"Add"**

Vercel will show DNS records you need to configure.

---

### Step 2: Configure DNS (Cloudflare/Your DNS Provider)

Add these records in your DNS provider (e.g., Cloudflare):

**For Root Domain (levqor.ai):**
```
Type: CNAME
Name: @  (or leave blank for root)
Value: cname.vercel-dns.com
Proxy: OFF (disable Cloudflare proxy initially)
```

**For www Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
Proxy: OFF
```

> **Note:** If CNAME for @ is not supported, use A record with Vercel's IP: `76.76.21.21`

---

### Step 3: Wait for DNS Propagation

- DNS changes take 5-60 minutes
- Check status: https://dnschecker.org/#CNAME/levqor.ai
- Vercel will auto-provision SSL certificate once DNS is verified

---

### Step 4: Verify Deployment

Once DNS propagates, test:
- ✅ https://levqor.ai
- ✅ https://www.levqor.ai
- ✅ https://levqor.ai/blog

---

## Troubleshooting

### DNS not propagating?
- Clear DNS cache: `sudo dscacheutil -flushcache` (Mac)
- Try different browser/incognito mode
- Check: https://dnschecker.org

### SSL certificate pending?
- Wait 10-15 minutes after DNS verification
- Vercel auto-provisions Let's Encrypt certificates
- Check status in Vercel dashboard

### 404 errors?
- Ensure domain is added in Vercel settings
- Redeploy if needed: `cd levqor-site && vercel --prod --token=$VERCEL_TOKEN`

---

## After Custom Domain is Live

### Update Backend CORS

Add `levqor.ai` to allowed origins in `run.py`:

```python
CORS(app, origins=[
    "https://app.levqor.ai",
    "https://levqor-web.vercel.app", 
    "https://levqor.ai",  # Add this
    "https://www.levqor.ai"  # And this
])
```

### Submit to Google Search Console

1. Go to: https://search.google.com/search-console
2. Add property: `levqor.ai`
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: `https://levqor.ai/sitemap.xml`

### Enable Analytics (Optional)

Set environment variable in Vercel:
```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=levqor.ai
```

Then redeploy to activate tracking.

---

**Need help?** Check Vercel docs: https://vercel.com/docs/concepts/projects/domains
