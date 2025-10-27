
"use client";
import {
  Card,
  CardBody,
  Image,
  Button,
  Link,
  Chip,
} from "@heroui/react";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";

interface ProfileCardProps {
  profile: {
    name: string;
    bio: string;
    avatarUrl: string;
    followers?: number;
    following?: number;
    htmlUrl: string;
    location?: string;
  } | null;
  isLoading?: boolean;
}

export const ProfileCard = ({ profile, isLoading = false }: ProfileCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-sm mx-auto bg-gray-800 animate-pulse">
        <CardBody className="flex flex-col items-center p-6">
          <div className="rounded-full bg-gray-700 h-32 w-32 mb-5"></div>
          <div className="h-7 bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6 mb-5"></div>
          <div className="flex gap-3 mt-4 w-full justify-center">
            <div className="h-10 w-10 rounded-md bg-gray-700"></div>
            <div className="h-10 w-10 rounded-md bg-gray-700"></div>
            <div className="h-10 w-10 rounded-md bg-gray-700"></div>
          </div>
          <div className="h-11 bg-gray-700 rounded-md w-full mt-6"></div>
        </CardBody>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="w-full max-w-sm mx-auto bg-gray-800">
        <CardBody className="p-6 text-center">
          <p className="text-gray-400">
            Could not load profile information at this time.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
      <CardBody className="p-6 flex flex-col items-center text-center">
        <Image
          src={profile.avatarUrl}
          alt={`${profile.name}'s avatar`}
          width={128}
          height={128}
          className="rounded-full mb-6 border-4 border-primary"
        />
        <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
        {profile.location && (
          <p className="text-sm text-gray-400 mb-4">{profile.location}</p>
        )}
        <div className="flex gap-4 mb-6">
          {profile.followers !== undefined && (
            <Chip color="primary">Followers: {profile.followers}</Chip>
          )}
          {profile.following !== undefined && (
            <Chip color="secondary">Following: {profile.following}</Chip>
          )}
        </div>
        <div className="flex gap-3 justify-center mb-6">
          <Link
            href={profile.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/naeemnagori/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-6 h-6 text-white" />
          </Link>
        </div>
        <Button
          as={Link}
          href="/Naeem_Resume.pdf"

          color="primary"
          className="w-full"
        >
          <FaFileDownload className="mr-2" /> Download Resume
        </Button>
      </CardBody>
    </Card>
  );
};
