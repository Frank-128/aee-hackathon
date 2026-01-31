import 'package:flutter/material.dart';
import 'buyer_order_details_page.dart';

class BuyerOrdersPage extends StatelessWidget {
  const BuyerOrdersPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            OrdersHeader(),
            SizedBox(height: 16),
            OrdersList(),
            SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}

class OrdersHeader extends StatelessWidget {
  const OrdersHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text(
      'My Orders',
      style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
    );
  }
}

class OrdersList extends StatelessWidget {
  const OrdersList({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        BuyerOrderTile(
          title: 'Potatoes (Desi)',
          quantity: '200 kg • Oct 24',
          price: '₹3,400',
          status: 'Completed',
          statusColor: Colors.green,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => const BuyerOrderDetailsPage(),
              ),
            );
          },
        ),
        BuyerOrderTile(
          title: 'Wheat (Premium)',
          quantity: '500 kg • Oct 21',
          price: '₹11,250',
          status: 'Completed',
          statusColor: Colors.green,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => const BuyerOrderDetailsPage(),
              ),
            );
          },
        ),
        BuyerOrderTile(
          title: 'Basmati Rice',
          quantity: '100 kg • Oct 18',
          price: '₹8,900',
          status: 'In Transit',
          statusColor: Colors.orange,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => const BuyerOrderDetailsPage(),
              ),
            );
          },
        ),
      ],
    );
  }
}

class BuyerOrderTile extends StatelessWidget {
  final String title;
  final String quantity;
  final String price;
  final String status;
  final Color statusColor;
  final VoidCallback onTap;

  const BuyerOrderTile({
    super.key,
    required this.title,
    required this.quantity,
    required this.price,
    required this.status,
    required this.statusColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
        ),
        child: Row(
          children: [
            const CircleAvatar(
              backgroundColor: Color(0xFFDFF3E3),
              child: Icon(Icons.agriculture, color: Color(0xFF2E7D32)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title,
                      style: const TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text(
                    quantity,
                    style:
                        const TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(price,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 4),
                Text(
                  status,
                  style: TextStyle(
                    color: statusColor,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

