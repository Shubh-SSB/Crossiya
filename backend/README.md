# Maison Crème backend

This folder contains a small Node service that will later back the cafe portal or admin panel.

## What it does

- creates signed table links
- renders QR SVG output for those links
- exposes a JSON endpoint the portal can call to generate QR assets

## Environment

- `PORT` - backend port, defaults to `4000`
- `TABLE_ACCESS_SECRET` - shared signing secret used to protect table links
- `ADMIN_API_TOKEN` - bearer token required to mint QR assets from the portal/panel
- `CAFE_WEB_APP_URL` - public cafe web app URL used in the QR link

## Run

```bash
cd backend
npm install
npm run dev
```

## Endpoint

- `POST /api/qr/tables` - body: `{ "tableNumber": "12" }`

Send it with an `Authorization: Bearer <token>` header. If `ADMIN_API_TOKEN` is set, the request is rejected unless the token matches.

Returns the signed cart URL, QR SVG, and the raw token payload.