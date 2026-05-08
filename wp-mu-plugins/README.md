# wp-mu-plugins/

Tracks must-use plugins for the live `neotechnology.solutions`
WordPress install. Each `.php` file in this directory is rsync-deployed to
`~/neotechnology.solutions/wp-content/mu-plugins/` on the host (Namecheap
shared hosting, LiteSpeed, port 21098).

WordPress auto-loads any top-level `.php` in `wp-content/mu-plugins/` —
no admin activation step. mu-plugins can't be disabled from the WP admin
UI, which is exactly why we use them for cross-cutting site policy
(security headers, response caching, asset trimming).

## Files

- `nts-perf-headers.php` — emits `Cache-Control`, HSTS, `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`. Dequeues
  WooCommerce front-end assets on non-Woo pages, drops `jquery-migrate`,
  defers `nts-main`. Closes Site Health "page cache not detected" plus
  several audit HIGHs.
- `nts-hardening.php` — kills `?author=N` enumeration, strips `users` routes
  from the REST API for unauthenticated requests, drops the WP `users`
  sitemap provider, removes generator metas + `?ver=` query strings,
  disables XML-RPC at the PHP layer, sets `SameSite=Lax` on auth cookies.
  Closes the public-attack-surface bundle of audit HIGHs and MEDIUMs.
- `htaccess-snippet.partial` — host-side rules block. NOT auto-deployed
  by rsync (excluded). Paste manually into `~/neotechnology.solutions/.htaccess`
  ABOVE `# BEGIN LSCACHE`. Provides the network-layer half of xmlrpc /
  `?author=N` blocking and refuses access to `.git`, `.env`, manifest files.

## Deploy

```sh
rsync -avz --exclude='.DS_Store' --exclude='*.partial' --exclude='README.md' \
    -e 'ssh -p 21098' \
    wp-mu-plugins/ \
    fsalmansour@162.254.39.146:~/neotechnology.solutions/wp-content/mu-plugins/
```

`.partial` and `README.md` stay repo-side.

## Verify

```sh
# Perf + security headers (from nts-perf-headers.php)
curl -sI https://neotechnology.solutions/ \
  | grep -iE 'cache-control|expires|strict-transport|x-content-type|referrer-policy|x-frame-options|permissions-policy'

# Hardening (from nts-hardening.php + htaccess-snippet.partial)
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://neotechnology.solutions/xmlrpc.php       # 403
curl -s -o /dev/null -w '%{http_code}\n' 'https://neotechnology.solutions/?author=1'              # 403
curl -s 'https://neotechnology.solutions/wp-json/wp/v2/users' | head -c 200                       # [] or 404
curl -s 'https://neotechnology.solutions/?nocache=test' | grep -i generator | wc -l               # 0
curl -sI https://neotechnology.solutions/wp-sitemap-users-1.xml                                   # 404
```
