import 'package:app/core/routes/app_routes.dart';
import 'package:flutter/material.dart';

class AccountPage extends StatelessWidget {
  const AccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7F5),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const ProfileCard(),
              const SizedBox(height: 24),

              const SectionTitle('Account'),
              const AccountCard(
                items: [
                  AccountRow(
                    icon: Icons.person_outline,
                    label: 'Account Information',
                  ),
                  AccountRow(
                    icon: Icons.shopping_bag_outlined,
                    label: 'My Orders',
                  ),
                  AccountRow(
                    icon: Icons.location_on_outlined,
                    label: 'Address Management',
                  ),
                  AccountRow(icon: Icons.settings_outlined, label: 'Setting'),
                  AccountRow(
                    icon: Icons.lock_outline,
                    label: 'Password Manager',
                  ),
                ],
              ),

              const SizedBox(height: 24),
              const SectionTitle('Accounts & Subscription'),
              const ToggleCard(),

              const SizedBox(height: 24),
              const SectionTitle('Terms & Condition'),
              const AccountCard(
                items: [
                  AccountRow(icon: Icons.download_outlined, label: 'Downloads'),
                  AccountRow(
                    icon: Icons.accessibility_new_outlined,
                    label: 'Accessibility',
                  ),
                  AccountRow(icon: Icons.language_outlined, label: 'Language'),
                  LogoutRow(),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ProfileCard extends StatelessWidget {
  const ProfileCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 26,
            backgroundImage: AssetImage('assets/images/avatar.jpg'),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Jon Alison',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 4),
                Text(
                  'alison35@gmail.com',
                  style: TextStyle(color: Colors.grey, fontSize: 12),
                ),
              ],
            ),
          ),
          OutlinedButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.edit, size: 16),
            label: const Text('Edit'),
          ),
        ],
      ),
    );
  }
}

class SectionTitle extends StatelessWidget {
  final String title;

  const SectionTitle(this.title, {super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
      ),
    );
  }
}

class AccountCard extends StatelessWidget {
  final List<Widget> items;

  const AccountCard({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        children: items
            .map(
              (e) => Column(
                children: [
                  e,
                  if (e != items.last) const Divider(height: 1, indent: 56),
                ],
              ),
            )
            .toList(),
      ),
    );
  }
}

class AccountRow extends StatelessWidget {
  final IconData icon;
  final String label;

  const AccountRow({super.key, required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon),
      title: Text(label),
      trailing: const Icon(Icons.chevron_right),
      onTap: () {},
    );
  }
}

class ToggleCard extends StatefulWidget {
  const ToggleCard({super.key});

  @override
  State<ToggleCard> createState() => _ToggleCardState();
}

class _ToggleCardState extends State<ToggleCard> {
  bool notification = true;
  bool myData = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        children: [
          SwitchListTile(
            value: notification,
            onChanged: (v) => setState(() => notification = v),
            title: const Text('Notification'),
          ),
          const Divider(height: 1, indent: 16),
          SwitchListTile(
            value: myData,
            onChanged: (v) => setState(() => myData = v),
            title: const Text('My Data'),
          ),
        ],
      ),
    );
  }
}

class LogoutRow extends StatelessWidget {
  const LogoutRow({super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const Icon(Icons.logout, color: Colors.red),
      title: const Text('Logout', style: TextStyle(color: Colors.red)),
      onTap: () => _showLogoutSheet(context),
    );
  }

  void _showLogoutSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) => Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Are you sure want to Logout?',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 6),
            const Text(
              'Thank you and see you again ❤️',
              style: TextStyle(color: Colors.grey),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('Cancel'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF2E7D32),
                    ),
                    onPressed: () {
                      Navigator.pushNamedAndRemoveUntil(
                        context,
                        AppRoutes.signIn,
                        (route) => false,
                      );
                    },
                    child: const Text('Yes, Logout'),
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
