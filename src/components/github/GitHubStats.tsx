import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GitHubProfile {
  followers: number;
  following: number;
  public_repos: number;
}

interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

interface GitHubStatsProps {
  username: string;
  className?: string;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ username, className }) => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`);

        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        setProfile(profileData);
        setRepos(reposData);
      } catch (err) {
        setError('No se pudieron cargar los datos de GitHub');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHub();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-cyber-green font-mono text-sm animate-pulse-fast">
          Cargando datos de GitHub...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={cn('bg-cyber-black/50 border border-red-500/30 rounded-lg p-8 text-center', className)}>
        <Github className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <p className="text-gray-400 font-mono text-sm">Error al cargar GitHub stats</p>
        <p className="text-gray-500 font-mono text-xs mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-cyber-black/50 border border-cyber-green/20 rounded-lg p-8', className)}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-cyber-green/20">
        <Github className="w-8 h-8 text-cyber-green" />
        <div>
          <h3 className="text-xl font-bold font-mono text-cyber-green">@{username}</h3>
          <p className="text-xs text-gray-400 font-mono">github.com/{username}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div>
          <div className="text-3xl font-bold font-mono text-white">{profile.public_repos}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">Repos</div>
        </div>
        <div>
          <div className="text-3xl font-bold font-mono text-cyber-cyan">{profile.followers}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">Seguidores</div>
        </div>
        <div>
          <div className="text-3xl font-bold font-mono text-cyber-magenta">{profile.following}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">Siguiendo</div>
        </div>
      </div>

      {/* Top repos by stars */}
      {repos.length > 0 && (
        <div>
          <h4 className="text-sm font-bold font-mono text-cyber-cyan mb-4 uppercase">Top Repositorios</h4>
          <div className="space-y-3">
            {repos.map((repo) => (
              <div key={repo.name} className="bg-cyber-dark-gray/30 border border-gray-700/30 rounded p-4 hover:border-cyber-green/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyber-green" />
                    <span className="font-mono text-sm text-white">{repo.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />{repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />{repo.forks_count}
                    </span>
                  </div>
                </div>
                {repo.language && (
                  <span className="text-xs text-gray-500 font-mono mt-2 inline-block">
                    {repo.language}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-cyber-green/20 text-center">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyber-green hover:text-cyber-cyan transition-colors font-mono"
        >
          Ver perfil completo →
        </a>
      </div>
    </div>
  );
};

export default GitHubStats;
