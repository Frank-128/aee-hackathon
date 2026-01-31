# API Documentation

## Auth
- POST `/api/auth/register` - { name, email, password, role }
- POST `/api/auth/login` - { email, password }
- POST `/api/auth/refresh-token` - { refreshToken }
- POST `/api/auth/logout`
- GET `/api/auth/me`
- PATCH `/api/auth/change-password`

## Farmer (Role: FARMER)
- GET/PUT `/api/farmers/profile`
- POST `/api/farmers/land`
- POST `/api/farmers/crop`
- GET `/api/farmers/crops`
- GET `/api/farmers/buyer-demands`
- GET `/api/farmers/recommended-price/:cropId`

## Buyer (Role: BUYER)
- GET/PUT `/api/buyers/profile`
- POST `/api/buyers/demand`
- GET `/api/buyers/demands`
- GET `/api/buyers/farmer-listings`
- POST `/api/buyers/negotiate`

## Market & AI
- GET `/api/market/live-demand-supply`
- GET `/api/market/price-trends`
- GET `/api/market/market-snapshots`
- POST `/api/predictions/yield`

## Matching & Deals
- POST `/api/matching/match`
- POST `/api/deals/create`
- POST `/api/deals/confirm/:dealId`
- GET `/api/deals/my-deals`

## Invest (Role: INVESTOR)
- POST `/api/investments/project` (FARMER)
- POST `/api/investments/invest/:projectId` (INVESTOR)

## Reviews
- POST `/api/reviews`
- GET `/api/reviews/trust-score/:farmerId`

## Admin (Role: ADMIN)
- GET `/api/admin/users`
- GET `/api/admin/analytics/overview`
