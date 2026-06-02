'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { useMe } from '@/hooks/useMe';
import { api } from '@/lib/api';
import { clearToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  const { data: me } = useMe();
  const router = useRouter();

  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    if (next !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setSaving(true);
    try {
      await api.post('/fleet/auth/change-password', {
        current_password: current,
        new_password: next,
      });
      toast.success('Password changed');
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    clearToken();
    router.push('/login');
  }

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-light">Settings</h1>

      {/* Account info */}
      {me && (
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Fleet name</span>
              <span className="text-light font-medium">{me.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Username</span>
              <span className="font-mono text-light">{me.username}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Revenue model</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Commission rate</span>
              <span className="text-lime font-medium">{Number(me.commission_rate)} ₦/km</span>
            </div>
          </div>
        </Card>
      )}

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
        </CardHeader>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-muted">Current password</label>
            <Input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted">New password</label>
            <Input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted">Confirm new password</label>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? 'Saving…' : 'Update password'}
          </Button>
        </form>
      </Card>

      {/* Danger zone */}
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
        </CardHeader>
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          Sign out
        </Button>
      </Card>
    </div>
  );
}
