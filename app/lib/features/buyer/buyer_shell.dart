import 'package:flutter/material.dart';
import 'package:app/features/buyer/buyer_home_page.dart';
import 'package:app/features/buyer/buyer_market_page.dart';
import 'package:app/features/buyer/buyer_orders_page.dart';
import 'package:app/features/account/account_page.dart';

class BuyerShell extends StatefulWidget {
  const BuyerShell({super.key});

  @override
  State<BuyerShell> createState() => _BuyerShellState();
}

class _BuyerShellState extends State<BuyerShell> {
  int currentIndex = 0;

  final pages = const [
    BuyerHomePage(),
    BuyerMarketPage(),
    BuyerOrdersPage(),
    AccountPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FBF9),

      body: IndexedStack(
        index: currentIndex,
        children: pages,
      ),

      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF2E7D32),
        onPressed: () {
          // later: quick buy / post request
        },
        child: const Icon(Icons.add, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,

      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 8,
        child: SizedBox(
          height: 60,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _navItem(Icons.home, 'Home', 0),
              _navItem(Icons.store, 'Market', 1),
              const SizedBox(width: 40),
              _navItem(Icons.list_alt, 'Orders', 2),
              _navItem(Icons.person, 'Profile', 3),
            ],
          ),
        ),
      ),
    );
  }

  Widget _navItem(IconData icon, String label, int index) {
    final isActive = currentIndex == index;
    final color = isActive ? const Color(0xFF2E7D32) : Colors.grey;

    return GestureDetector(
      onTap: () => setState(() => currentIndex = index),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: color),
          Text(label, style: TextStyle(fontSize: 12, color: color)),
        ],
      ),
    );
  }
}
