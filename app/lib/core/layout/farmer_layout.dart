import 'package:app/features/farmer/requests.dart';
import 'package:flutter/material.dart';
import '../../features/farmer/farmer_dashboard.dart';
import '../../features/farmer/market_page.dart';
import '../../features/farmer/chat_page.dart';
import '../../features/farmer/profile_page.dart';

class FarmerShell extends StatefulWidget {
  const FarmerShell({super.key});

  @override
  State<FarmerShell> createState() => _FarmerShellState();
}

class _FarmerShellState extends State<FarmerShell> {
  int currentIndex = 0;

  final pages = const [
    FarmerDashboard(),
    MarketPage(),
    BuyerRequestsPage(),
    ChatPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FBF9),

      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF2E7D32),
        onPressed: () {
          Navigator.pushNamed(context, '/farmer/add-crop');
        },
        child: const Icon(Icons.add,color:Colors.white),
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
              _navItem(Icons.inbox, 'Requests', 2),
              _navItem(Icons.chat, 'Chat', 3),
            ],
          ),
        ),
      ),

      body: IndexedStack(
        index: currentIndex,
        children: pages,
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
