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

## Deploy

```sh
rsync -avz --exclude='.DS_Store' -e 'ssh -p 21098' \
    wp-mu-plugins/ \
    fsalmansour@162.254.39.146:~/neotechnology.solutions/wp-content/mu-plugins/
```

## Verify

```sh
curl -sI https://neotechnology.solutions/ \
  | grep -iE 'cache-control|expires|strict-transport|x-content-type|referrer-policy|x-frame-options|permissions-policy'
```
